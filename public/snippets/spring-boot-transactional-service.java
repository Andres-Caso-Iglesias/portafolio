import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Transactional
    public Pedido crearPedido(Pedido pedido) {
        // Validaciones de negocio antes de persistir
        validarProducto(pedido.getProducto());
        validarCantidad(pedido.getCantidad());
        
        // Lógica de negocio: calcular precio total basado en descuentos por volumen
        Double precioConDescuento = calcularPrecioConDescuento(
            pedido.getProducto(), 
            pedido.getCantidad()
        );
        
        // Crear entidad inmutable con el precio calculado
        Pedido pedidoConPrecio = new Pedido(
            null, 
            pedido.getProducto(), 
            pedido.getCantidad(), 
            precioConDescuento,
            "PENDIENTE",
            pedido.getClienteId()
        );
        
        return pedidoRepository.save(pedidoConPrecio);
    }

    @Transactional(readOnly = true)
    public Pedido obtenerPedidoPorId(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));
    }

    private void validarProducto(String producto) {
        if (producto == null || producto.trim().isEmpty()) {
            throw new IllegalArgumentException("El producto no puede estar vacío");
        }
        // Otras validaciones de producto...
    }

    private void validarCantidad(int cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor que cero");
        }
        if (cantidad > 1000) {
            throw new IllegalArgumentException("Cantidad excede el límite permitido por pedido");
        }
    }

    private Double calcularPrecioConDescuento(String producto, int cantidad) {
        // Lógica de descuentos por volumen
        Double precioBase = obtenerPrecioBase(producto);
        if (cantidad >= 100) {
            return precioBase * 0.9; // 10% de descuento
        } else if (cantidad >= 50) {
            return precioBase * 0.95; // 5% de descuento
        }
        return precioBase;
    }
}
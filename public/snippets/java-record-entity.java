import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "pedidos")
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public record Pedido(
        @Id
        Long id,
        String producto,
        int cantidad,
        Double precioTotal,
        String estado,
        String clienteId
) {
    // Records are immutable by default, which ensures thread-safety and prevents accidental state changes
    // Additional business logic can be added in companion objects or service layer
}
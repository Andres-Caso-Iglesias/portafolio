import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// Entidad JPA con Lombok - Spring Boot 3.2 + MySQL
// Patron: @Entity con @Getter/@Setter en lugar de Records

@Entity
@Table(name = "food_trucks")
@Getter
@Setter
public class FoodTruck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(name = "tipo_cocina")
    private String tipoCocina;

    @Column(name = "ubicacion_actual")
    private String ubicacionActual; // Formato: "ciudad, calle"
}

// --- Otras entidades del proyecto ---
// Menu: @ManyToOne -> FoodTruck, atributos: nombre, descripcion, precio, imagenUrl
// Pedido: @ManyToOne -> Usuario + FoodTruck, atributos: items, montoTotal, estado
// Usuario: atributos: nombre, email, password, ubicacion
// Notificacion: @ManyToOne -> Usuario, atributos: mensaje, fechaEnvio
// Entidad JPA Bancal - Spring Boot 3.2 + MySQL
// Relaciones: N:1 con Huerto, 1:1 con Semilla

package com.gestor.huertos.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "bancales")
@Getter
@Setter
public class Bancal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String dimensiones;

    @ManyToOne
    @JoinColumn(name = "huerto_id", nullable = false)
    private Huerto huerto;

    @OneToOne
    @JoinColumn(name = "semilla_id")
    private Semilla semilla;
}

// Otras entidades del proyecto:
// Huerto: @OneToMany -> List<Bancal> (cascade ALL)
// Semilla: nombre, variedad, cantidad, proveedor, notas
// RegistroCultivo: @OneToOne Bancal, @OneToOne Semilla, fecha
// Siembra: @ManyToOne RegistroCultivo, cantidadSembrada, notas

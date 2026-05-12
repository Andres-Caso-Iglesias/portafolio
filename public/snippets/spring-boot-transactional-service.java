import com.foodbites.truck_bites.dto.FoodTruckDTO;
import com.foodbites.truck_bites.model.FoodTruck;
import com.foodbites.truck_bites.repository.FoodTruckRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// Servicio con inyeccion por constructor (no @Autowired)
// Patron: @Service + @Transactional + constructor injection

@Service
public class FoodTruckService {

    private final FoodTruckRepository foodTruckRepository;

    // Constructor injection - mejor practica que @Autowired
    public FoodTruckService(FoodTruckRepository foodTruckRepository) {
        this.foodTruckRepository = foodTruckRepository;
    }

    @Transactional
    public FoodTruckDTO crearFoodTruck(FoodTruckDTO dto) {
        FoodTruck entity = new FoodTruck();
        entity.setNombre(dto.getNombre());
        entity.setTipoCocina(dto.getTipoCocina());
        entity.setUbicacionActual(dto.getUbicacionActual());
        entity = foodTruckRepository.save(entity);
        return toDTO(entity);
    }

    public List<FoodTruckDTO> obtenerFoodTrucks() {
        return foodTruckRepository.findAll()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public FoodTruckDTO obtenerFoodTruckPorId(Long id) {
        return foodTruckRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new IllegalArgumentException(
                    "FoodTruck no encontrado con ID: " + id));
    }

    @Transactional
    public FoodTruckDTO actualizarFoodTruck(Long id, FoodTruckDTO dto) {
        return foodTruckRepository.findById(id).map(entity -> {
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getTipoCocina() != null) entity.setTipoCocina(dto.getTipoCocina());
            if (dto.getUbicacionActual() != null) entity.setUbicacionActual(dto.getUbicacionActual());
            return toDTO(foodTruckRepository.save(entity));
        }).orElseThrow(() -> new IllegalArgumentException("FoodTruck no encontrado"));
    }

    public List<FoodTruckDTO> obtenerFoodTrucksCerca(String ciudad, String calle) {
        return foodTruckRepository
                .findByUbicacionActualContainingIgnoreCase(ciudad)
                .stream()
                .filter(ft -> calle == null || calle.isEmpty()
                    || ft.getUbicacionActual().toLowerCase().contains(calle.toLowerCase()))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private FoodTruckDTO toDTO(FoodTruck entity) {
        return new FoodTruckDTO(entity.getId(), entity.getNombre(),
                entity.getTipoCocina(), entity.getUbicacionActual(), 0);
    }
}
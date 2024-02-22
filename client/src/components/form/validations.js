const validation = (error) => {
    const errors = {};
    
    if (error.name.length < 2) {
        errors.name = "Minimo 2 caracteres";
    }
    if (error.name.length > 20) {
        errors.name = "Maximo 20 caracteres";
    }
    if (/[^a-zA-Z0-9\s]+/.test(error.name)) {
        errors.name = "El nombre contiene caracteres invalidos";
    }
    
    
    if (!/^(http|https):\/\/[^ "]+$/.test(error.background_image)) {
        errors.background_image = "La URL de imagen no es valida";
    }
    
    
    if (!/^[a-zA-Z,\s]*$/.test(error.description_raw)) {
        errors.description_raw = "La descripción tiene caracteres no validos";
    }
    if (error.description_raw.length < 10) {
        errors.description_raw = "La descripción es demasiado corta";
    }
    
    if(error.description_raw.length > 300) {
        errors.description_raw = "La descripción no debe ser mayor a 300 caracteres"
    }
    
    
    if (!/^(1(\.0)?|[2-4](\.\d+)?|5(\.0)?)$/.test(error.rating)) {
        errors.rating = "La valoración debe ser un numero entre 1 a 5";
    }
    
    
    if (error.parent_platforms.length < 1) {
        errors.parent_platforms = "Minimo se requiere una plataforma";
    }
    
    if (error.released) {
        const currentDate = new Date();
        const selectedDate = new Date(error.released);
        if (selectedDate > currentDate) {
            errors.released = "El lanzamiento no puede ser en el futuro";
        }
    }
    
    if (error.genres.length < 1) {
        errors.genres = "Minimo se requiere un genero";
    }

        return errors;
    };

export default validation;
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const { inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar,
        confirmar} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

require('colors');
console.clear();


const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();
    
    const tareasDb = leerDB();

    if ( tareasDb ) {
        tareas.cargarTareaFormArray( tareasDb )
    }
    
    do {

        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':  
                const desc = await leerInput( 'Tarea para hacer: ' )
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listadoPendientesCompletadas(true)
                break;
            case '4':
                tareas.listadoPendientesCompletadas(false);
                break;
            case '5':
                
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr )
                if ( id !== '0' ) {
                    const ok = await confirmar('Estas seguro de borrar');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log( 'Tarea borrada'.red );
                    }
                }
                break;
            default:
                break;
        }

        guardarDB( tareas.listadoArr );
        
        await pausa(); 
        
    } while ( opt !== '0' );
    

}


main();
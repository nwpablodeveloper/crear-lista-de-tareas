const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const { inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList} = require('./helpers/inquirer');

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
            case '1':  // Crear tarea
                const desc = await leerInput( 'Tarea para hacer: ' )
                tareas.crearTarea( desc );
                break;
            case '2': // Litar Tareas
                tareas.listadoCompleto()
                break;
            case '3': // Listar tareas completadas
                tareas.listadoPendientesCompletadas(true)
                break;
            case '4': // listar tareas pendientes
                tareas.listadoPendientesCompletadas(false);
                break;
            case '5': // completar tareas
                const { ids } = await mostrarListadoCheckList( tareas.listadoArr )
                tareas.toggleCompletadas( ids )
                break;
            case '6': // Borrar tareas
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
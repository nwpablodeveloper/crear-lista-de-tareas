const Tarea = require("./tarea");
const colors = require('colors');

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach( key => {
            listado.push( this._listado[key] );
        })

        return listado; 

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '') {

        if ( this._listado[id] ) {
            console.log( 'Borrar tarea' );
            delete this._listado[id]
        }

    }

    cargarTareaFormArray( tareas = [] ){
        
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log();
        
        this.listadoArr.forEach( ( tarea, i ) => {

            const { desc, completadoEn } = tarea;

            const estado = (completadoEn) 
                                ? 'Completado'.green
                                : 'Pendiente'.red

            console.log(` ${ colors.brightBlue(i + 1) }. ${ desc } :: ${ estado }`);
        })
        

        /* 
        Object.keys( this._listado ).forEach( id => {
            if ( this._listado[id].completadoEn === null ) {

                console.log( colors.red(this._listado[id].desc));
                
            }
        }) */
        
    }

    listadoPendientesCompletadas( completadas  ) {

        console.log();
        let contador = 1;

        this.listadoArr.forEach( tarea  =>  {
            const { desc, completadoEn } = tarea;

            const estado =  ( completadoEn )
                                ? 'Completado'.green
                                : 'Pendiente'.red

            if( completadas ) {
                if( completadoEn ) {
                    console.log(`${ ( contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                    contador += 1;
                }
            }else{
                if( !completadoEn ) {
                    console.log(`${ ( contador + '.').green } ${ desc } :: ${ estado }`);
                    contador += 1;
                }
            }

        })

    } 
    
    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
            return tarea
        });

        this.listadoArr.forEach( tarea => {
            
            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn =  tarea.completadoEn = null;
            }

        });

    }
}

module.exports = Tareas;
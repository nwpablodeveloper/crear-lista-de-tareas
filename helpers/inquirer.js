const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.brightGreen } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.brightGreen } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.brightGreen } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.brightGreen } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.brightGreen } Completar tarea/s`
            },
            {
                value: '6',
                name: `${ '6.'.brightGreen } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.brightGreen } Salir`
            }
        ]
    }
]


const inquirerMenu = async () => {

    console.log('=============================='.green);
    console.log('    Seleccione uan opción   '.white);
    console.log('==============================\n'.green);
    
    const { opcion }  = await inquirer.prompt(preguntas);
    return opcion;
}



const listadoTareasBorrar = async ( tareas = [] ) => {
    
        const choices = tareas.map( ( tarea, i ) => {
            const idx = `${ i + 1  }.`.green
            return { 
                    value: tarea.id,
                    name: `${ idx } ${ tarea.desc }`
                }
        });

        choices.push({
            value: '0',
            name: '0. Volver'.green
        })

        const preguntas = {
            type: 'list',
            name: 'obtenerId',
            message: 'Que tarea desea borrar',
            choices
        }

        const { obtenerId } = await inquirer.prompt(preguntas);

        return obtenerId;


}


const pausa = async () => {

    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`,
        }
    ]

    console.log('\n');
    await inquirer.prompt(pregunta);
    console.clear();
}

const leerInput = async ( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if ( value.length === 0 ) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            } 
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const confirmar = async ( message ) => {
    
    const question = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const { ok } = await inquirer.prompt( question )
    return ok
}


const mostrarListadoCheckList = async ( tareas = [] ) => {


    const choices = tareas.map( ( tarea , i) => {

        const idx = `${ i + 1 }.`.green;

        return {
            value: tarea.id,
            name: `${ idx} ${ tarea.desc }`,
            checked: (  tarea.completadoEn ) ? true : false,
        }         
    });

    choices.push({
        value: '0',
        name: '0. Volver'.green
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Completar tarea/s',
            choices
        }
    ]

    const  ids  = inquirer.prompt( preguntas );
    return ids;




}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}
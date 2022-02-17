const {io} = require('../index');
const Band = require('./models/band');
const Bands = require('./models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('macarena'));
bands.addBand(new Band('nena'));
bands.addBand(new Band('lolis'));

console.log(bands);
//Mensajes de Sockets 
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.emit('active-bands', bands.getBands());


  client.on('disconnect', () => { 
      console.log('cliente desconectado');
   });


   client.on('mensaje',(payload) => {
       console.log('mensaje',payload);
       io.emit('mensaje',{admin: 'Nuevo mensaje'})
   });


    client.on('vote-band',(payload)=> {
        
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());


    });

    client.on('add-new-band',(payload)=> {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands',bands.getBands());


    });
    client.on('delete-band',(payload)=> {
       
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBands());


    });
//    client.on('emitir-mensaje',(payload) => {
//        console.log('emitir-mensaje',payload)
//     io.emit('nuevo-mensaje',payload); //Emite a todos los clientes
//     client.broadcast.emit('nuevo-mensaje', payload); // Emite a todos menos al que lo emitio
//     });


});
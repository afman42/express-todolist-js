var express = require('express');
var router = express.Router();
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'todolist'
    },
    debug: true
});


/* GET home page. */
router.get('/', async function(req, res, next) {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus }
  const tampil = await knex.select('deskripsi', 'tugas').from('tugas')
  res.render('index', { alert, tampil} );
});

router.get('/tambah-data', function(req, res, next) {
  res.render('tambah', { model: true });
});

router.get('/edit-data/:tugas', async function(req, res, next) {
  const { tugas } = req.params;
  const tampil = await knex('tugas').where({
      tugas,
    }).select('*')
  console.log(tampil[0].deskripsi);
  res.render('tambah', { model: false, tampil });
});

router.post('/insert-data', async function(req, res, next) {
  try {
    const { tugas, deskripsi } = req.body;

    console.log('Tugas :',tugas);
    console.log('Deskripsi :',deskripsi);

    await knex('tugas').insert({
        tugas,
        deskripsi
    })
    req.flash('alertMessage', 'Berhasil Ditambah');
    req.flash('alertStatus', 'success');
    res.redirect('/');
  } catch (e) {
    console.log(e)
  }
});

router.put('/update-data', async function(req, res, next) {
  try {
    const { tugas, deskripsi, id } = req.body;

    console.log('Tugas :',tugas);
    console.log('Deskripsi :',deskripsi);

    await knex('tugas')
      .where('id_tugas',id)
      .update({
        tugas,deskripsi
      })
    req.flash('alertMessage', 'Berhasil Diupdate');
    req.flash('alertStatus', 'success');
    res.redirect('/');
  } catch (e) {
    console.log(e)
    req.flash('alertMessage', 'Gagal Diupdate');
    req.flash('alertStatus', 'danger');
    res.redirect('/');
  }
});

router.delete('/hapus-data/:tugas', async function(req, res, next) {
  try {
    const { tugas } = req.params;
    await knex('tugas')
    .where('tugas', tugas)
    .del()
    req.flash('alertMessage', 'Berhasil Dihapus');
    req.flash('alertStatus', 'success');
    res.redirect('/');
  }catch (e){
    console.log(e)
    req.flash('alertMessage', 'Gagal Dihapus');
    req.flash('alertStatus', 'danger');
    res.redirect('/');
  }
})
module.exports = router;

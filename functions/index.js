const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addObject = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Respond to preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const data = req.body;
  admin.firestore().collection('objects').doc(data.obj_id).set(data)
    .then(() => {
      res.status(200).send('Object added/updated successfully');
    })
    .catch((error) => {
      console.error('Error adding/updating object:', error);
      res.status(500).send('Error adding/updating object');
    });
});

exports.getObject = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  const objId = req.query.obj_id;
  admin.firestore().collection('objects').doc(objId).get()
    .then(doc => {
      if (!doc.exists) {
        res.status(404).send('Object not found');
      } else {
        res.status(200).json(doc.data());
      }
    })
    .catch(error => {
      console.error('Error getting object:', error);
      res.status(500).send('Error getting object');
    });
});

exports.deleteObject = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  const objId = req.query.obj_id;
  admin.firestore().collection('objects').doc(objId).delete()
    .then(() => {
      res.status(200).send('Object deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting object:', error);
      res.status(500).send('Error deleting object');
    });
});

exports.getAllObjects = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  admin.firestore().collection('objects').get()
    .then(snapshot => {
      const objects = [];
      snapshot.forEach(doc => {
        objects.push(doc.data());
      });
      res.status(200).json(objects);
    })
    .catch(error => {
      console.error('Error getting all objects:', error);
      res.status(500).send('Error getting all objects');
    });
});

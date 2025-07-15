const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://darluch:utdom@utdom.rkrwl8d.mongodb.net/?retryWrites=true&w=majority&appName=utdom', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('SD DB connected'))
.catch(err => console.error('DB connection error:', err));

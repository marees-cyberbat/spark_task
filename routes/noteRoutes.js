const CategoryModel = require('../models/Categories');
const NoteModel = require('../models/Note');


const requireLogin = require('../middlewares/requireLogin');

const Category = CategoryModel.getCategorySchema();
const Note = NoteModel.getNoteSchema()




module.exports = app =>{

/**
 * init note
 */
/**
 * @route POST /api/new_category
 * @description Create new user specific category
 * @access Private
 * 
 */
app.post('/api/new_cat', requireLogin ,async(req, res)=>{
    Category.findOneAndUpdate({user: req.body.user},{$set: req.body}, {new: true, useFindAndModify: false}, (err, result) => {
        if(err) res.status(400).json({ msg: err.toString() });

        if(result === null){
            let newCat = new Category(req.body);
            newCat.save();
        }
            
        return res.status(200).json({ msg: 'Added Successfully' });
    });
});

/**
 * @route POST /api/new_category
 * @description Create new user specific category
 * @access Private
 * 
 */
app.post('/api/delete_cat', requireLogin ,async(req, res)=>{
    console.log(req.body)
    let cat = await Category.findOneAndUpdate({user: req.body.data.user},{$set: req.body.data}, {new: true, useFindAndModify: false}, async (err, result) => {
        if(err) {
            console.log(err.toString())
            res.status(400).json({ msg: err.toString() })
    };

        // if(result === null){
        //     let newCat = new Category(req.body);
        //     newCat.save();
        // }
          // clean up notes
          try{
            let t = await Note.find({ user: req.body.data.user, category: req.body.chosen }).remove()
            console.log(t)
            return res.status(200).json({ msg: 'Deleted Successfully' });
          } catch(e){
              console.log(e)
          }
    });
});


/**
 * @route POST /api/new_note
 * @description Create category specific note
 * @access Private
 * 
 */
app.post('/api/new_note', requireLogin ,async(req, res)=>{
    console.log(req.body);
    // {
    //     category: "shop",
    //     title: "vegetable",
    //     note: sample txt note,
    //     created: Date.now()
    // }
    const myNote = new Note(req.body);
    try{
    await myNote.save();
    return res.status(200).json({ msg: 'Added Successfully' })

} catch(e){
    return res.status(500).json({ msg: 'Internal Server Error' });
}
});


/**
 * @route POST /api/get_cat/user_unique_id
 * @description Create category specific note
 * @access Public
 * 
 */
// get category
app.get('/api/get_cat/:id' ,async(req, res)=>{
    console.log(req.params.id);
    try{
        const cats = await Category.findOne({user:req.params.id});
        res.status(200).json({ msg: 'Success', resp: cats })
    } catch(e){
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
 
});

/**
 * @route POST /api/delete_note
 * @description delete note
 * @access Private
 * 
 */
// delete note
app.post('/api/delete_note', requireLogin, async(req, res)=>{
    try{
    const deleteNote = await Note.findOneAndDelete(req.body);
  
    if(deleteNote)
        return res.status(200).json({ msg: 'Deleted Successfully' })
    } catch(e){
        return res.status(500).json({ msg: 'Internal Server Error' });

    }

})

/**
 * @route POST /api/get_note/userId
 * @description get user specific notes
 * @access Publkic
 * 
 */
// get note
app.get('/api/get_note/:id' ,async(req, res)=>{
    console.log(req.params.id);
    try{
        const cats = await Note.find({user:req.params.id});
        res.status(200).json({ msg: 'Success', resp: cats })
    } catch(e){
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
 
});

}


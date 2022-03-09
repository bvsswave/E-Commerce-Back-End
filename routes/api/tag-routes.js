const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {

  // find all tags

  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],

  // be sure to include its associated Product data

  include: [{
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
  }
]
})
.then(tagData => {
  if (!tagData) {
    res.status(404).json({ message: "Data not found" });
    return;
  }
  res.json(tagData);
})
.catch(err => {
  res.status(500).json({ message: "Data not found"})
});


});

router.get('/:id', (req, res) => {

  // find a single tag by its `id`

  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],

  // be sure to include its associated Product data

  include: [{
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
  }
]
})
.then(tagData => {
  if (!tagData) {
    res.status(404).json({ message: "Tag with id not found" });
    return;
  }
  res.json(tagData);
})
.catch(err => {
  res.status(500).json({ message: "Tag with id not found"})
});

});

router.post('/', (req, res) => {

  // create a new tag

  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    res.status(500).json({ message: "There's an error"});
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }
  )
  .then(tagData => res.json({ message: "Tag is now updated" }))
  .catch(err => {
    res.status(404).json({ message: "Tag with id not found" });
  });
});

router.delete('/:id', (req, res) => {

  // delete on tag by its `id` value

  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: "Tag with id not found"});
      return;
    }
    res.json({ message: "Tag is now deleted" });
  })
  .catch(err => {
    res.status(500).json({ message: "There's an error"})
  })
});


module.exports = router;

set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE

db.createUser({
   user: '$MONGO_USERNAME',
   pwd: '$MONGO_PASSWORD',
   roles: [
      { role: "read", db: '$MONGO_INITDB_DATABASE' }
   ]
})

db.movies.insertMany( [
   {
      title: 'Titanic',
      year: 1997,
      genres: [ 'Drama', 'Romance' ],
      poster: 'https://pics.filmaffinity.com/titanic-321994924-msmall.jpg',
      sinopsis: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.'
   },
   {
      title: 'Spider-Man: Across the Spider-Verse',
      year: 2023,
      genres: [ 'Animation', 'Adventure', 'Family' ],
      poster: 'https://pics.filmaffinity.com/spider_man_across_the_spider_verse-257260163-msmall.jpg',
      sinopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.'
   },
   {
      title: 'Barbie',
      year: 2023,
      genres: [ 'Comedy', 'Adventure', 'Fantasy' ],
      poster: 'https://pics.filmaffinity.com/barbie-295661697-msmall.jpg',
      sinopsis: 'Barbie suffers a crisis that leads her to question her world and her existence.'
   }
] )

EOF
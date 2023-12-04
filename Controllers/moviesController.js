const Movie = require("./../Models/movieModel")


exports.getAllMovies = async (req,res) =>{
    try{
        console.log(req.query.duration, req.query.rating*1);
        const movies = await Movie.find({ duration: {$gte: req.query.duration *1}, ratings: { $gte: req.query.rating *1 } });
        //const movies = await Movie.find();
        res.status(200).json({
            stauts: 'success',
            length: movies.length,
            data: {
                movies: movies
            }

        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }

}

exports.getMovie = async (req,res) =>{
    try{
        //const movie = await Movie.find({_id: req.params.id});
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            stauts: 'success',
        
            data: {
                movie: movie
            }

        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }

}

exports.addMovies = async (req,res) =>{
    try{
        const movie = await Movie.create(req.body);

        res.status(200).json({
            stauts: 'success',
            data: {
                movie: movie
            }

        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateMovies = async (req, res) => {
    try{
        
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        console.log.apply(movie)
        res.status(200).json({
            stauts: 'success',
            data: {
                movie: movie
            }

        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteMovies = async (req, res)=>{
    try{
        //const movie = await Movie.find({_id: req.params.id});
        const movie = await Movie.findByIdAndDelete(req.params.id);
        res.status(204).json({        //204 means no content.
            stauts: 'success',
        
            data: null

        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}


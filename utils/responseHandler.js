

exports.errorResponse = (res, message = 'unsuccessful', status = 400) => {
  return res.status(status).json({
    
   
      error: message
  })
}


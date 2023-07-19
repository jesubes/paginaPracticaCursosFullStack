getFileName = (file)=>{
  const filePath = file.path;
  
  const splitFile = filePath.split("\\")
  return `${splitFile[1]}/${splitFile[2]}`
}



module.exports = {
  getFileName,
}
var reader = new FileReader();
reader.onload = (event) => {
	var dataUri = event.target.result;
	console.log(dataUri);
}
reader.onerror = function(event){
           console.log("File could not be read: " + event.target.error.code);
};
reader.readAsDataUrl('csdl-system.png');
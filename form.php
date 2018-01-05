<?php 
header("Content-type: text/plain; charset=utf-8"); 
header("Location:index.html");


    
    // *File feltöltés* //
$imgname = null;
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 1) {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        $imgname = basename($_FILES["fileToUpload"]["name"]);
    }
}
// if everything is ok, try to upload file

    // *Form adatok elküldése* //
    $myFile = "data.json";
    $arr_data = array(); // create empty array

  try
  {
	   //Get form data
	   $formdata = array(
	      'dates'=> array(
              $_POST['date-start'],
              $_POST['date-end']
              ),
	      'places'=> array(),
          'drive'=>$_POST['drive'],
	      'imgname'=> $imgname
	   );
      
      for ($i = 0; $i < 4; $i++) {
        if (isset($_POST["place-" . $i])) {
            $formdata['places'][$i] = $_POST["place-" . $i];
            $formdata['places'] = array_values($formdata['places']);
        }
    }

	   //Get data from existing json file
	   $jsondata = file_get_contents($myFile);

	   // converts json data into array
	   $arr_data = json_decode($jsondata, true);

	   // Push user data to array
	   array_push($arr_data,$formdata);

       //Convert updated array to JSON
	   $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);
	   
	   //write json data into data.json file
	   if(file_put_contents($myFile, $jsondata)) {
	        echo 'Data successfully saved';
	    }
	   else 
	        echo "error";

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }
?>

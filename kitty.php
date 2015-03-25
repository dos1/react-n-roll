<?php

function download_page($path){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$path);
	curl_setopt($ch, CURLOPT_FAILONERROR,1);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	$retValue = curl_exec($ch);
	curl_close($ch);
	return $retValue;
}

$sXML = download_page('http://thecatapi.com/api/images/get?format=xml');
$oXML = new SimpleXMLElement($sXML);

header('Content-Type: application/json');

echo '{"url": "'.$oXML->data->images->image->url.'", "source": "'.$oXML->data->images->image->source_url.'"}';
?>

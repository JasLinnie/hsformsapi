<?php

$hubspotutk      = $_COOKIE['hubspotutk']; //grab the cookie from the visitors browser.
$ip_addr         = $_SERVER['REMOTE_ADDR']; //IP address too.
$hs_context      = array(
    'hutk' => $hubspotutk,
    'ipAddress' => $ip_addr,
    'pageUrl' => 'http://www.example.com/form-page',
    'pageName' => 'Example Title'
);
$hs_context_json = json_encode($hs_context);
$firstname = $_POST['firstname'];
$email = $_POST['email'];

//Need to populate these variable with values from the form.
$str_post = "firstname=" . urlencode($firstname)
    . "&email=" . urlencode($email)
    . "&hs_context=" . urlencode($hs_context_json); //Leave this one be

//replace the values in this URL with your portal ID and your form GUID, could use http version too
$endpoint = 'http://forms.hubspot.com/uploads/form/v2/3787161/b7a1efb4-9ca1-4694-b1ea-08ffede9fb35';

$ch = @curl_init();
@curl_setopt($ch, CURLOPT_POST, true);
@curl_setopt($ch, CURLOPT_POSTFIELDS, $str_post);
@curl_setopt($ch, CURLOPT_URL, $endpoint);
@curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/x-www-form-urlencoded'
));
// @curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //To blindly accept any secured or unsecured attempts
@curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response    = @curl_exec($ch); //Log the response from HubSpot as needed.
$status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); //Log the response status code
$curl_errors = curl_error($ch); //Log error message
@curl_close($ch);
echo $status_code . " " . $response . $curl_errors;

?>

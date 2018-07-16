//just execute in a blank webpage (<html><body></body></html>) to get a list of routes

$.get( "https://ip-ranges.amazonaws.com/ip-ranges.json", 
function( data ) {
	var res = "";
	$.each(data.prefixes, function(i, prefix){
			
		if(prefix.service != "EC2" || prefix.service != "S3"){
			return;
		}
		
		let netmaskblocks = ["0","0","0","0"];
		let ip_prefix     = prefix.ip_prefix;
		let ip    = ip_prefix.substring(0, ip_prefix.indexOf('/'));
		let range = ip_prefix.substring(ip_prefix.indexOf('/') + 1);
		
		//Thanks to stack overflow for saving me a few minutes.
		//https://stackoverflow.com/questions/32978982/calculate-ip-range-from-ip-string-equal-to-x-x-x-x-x
		netmaskblocks = ("1".repeat(parseInt(range, 10)) + "0".repeat(32-parseInt(range, 10))).match(/.{1,8}/g);
		netmaskblocks = netmaskblocks.map(function(el) { 
			return parseInt(el, 2); 
		});
		
		
		res += "route " + ip + "  " + netmaskblocks.join(".") + "<br />";
	});
  
	$('body').html(res);
}); 

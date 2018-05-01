$(function(){
    $("#remove").click(function(){
        $("#table").remove();
    });
});


$(function(){
    $("#add").click(function(){
        $("#table").clone().appendTo("#div1");
    });
});

$(function(){
    $("#remove2").click(function(){
        $("#table2").remove();
    });
});


$(function(){
    $("#add2").click(function(){
        $("#table2").clone().appendTo("#div2");
    });
});

function create_recipe()
{
	var obj = {name: $("#name_table").val(), pseudo: $("#pseudo").val(), email: $("#adresse_email").val(), pers: $("#pers").val(), style: $("#style").val(), temps_preparation: $("#temps_préparation").val(), temps_cuisson: $("#temps_cuisson").val(), ingredients: [], step: []};
	var button = $($("#create_btn"));
	var tables = $(".Num");
	var	tables2 = $(".Num2");
	
	tables.each(function(key, value){
		var elmts = $(value).find(".s_num");
		obj.ingredients.push({
			aliment: elmts[0].value,
			quantite: elmts[1].value,
			volume: elmts[2].value,
		});
	});
	tables2.each(function(key, value){
		var elmts = $(value).find(".s_num2");
		obj.step.push({
			etape: elmts[0].value,
		});
	});
	console.log(JSON.stringify(obj));
	console.log(obj);
	$.ajax({
		method: "POST",
		url: 'http://marmiton-etna.cloudapp.net/api/recipe',
		data: JSON.stringify(obj),
		contentType: 'application/json; charset=utf-8',
		success: function(data){
			console.log(data);
			//window.location.reload(true);
		},
		error:function(data){
			$("#alert").remove();
			$("#create_btn").append('<div id="alert" class="alert alert-warning">Erreur lors de la création d\'une table.</div>')}
		});
}

$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div><input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});
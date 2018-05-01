function format (data) {
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
    '<tr>'+
    '<td>Matricule:</td>'+
    '<td>'+data.id_poste+'</td>'+
    '</tr>'+
    '<tr>'+
    '<td>Nom:</td>'+
    '<td>'+data.flatName+'</td>'+
    '</tr>'+
    '<tr>'+
    '<td>Adresse:</td>'+
    '<td>'+data.address+'</td>'+
    '</tr>'+
    '</table>';
}

$(document).ready(function() {
    var table = $('#example').DataTable({
        "ajax": {
            "url": "http://localhost:3000/Flats",
            "dataSrc": "",
            "type": "GET"
        },
        "columns": [
        { 
            "data": "id_poste",
            "className": "database_click" 
        },
        {
            "targets": -1,
            "className":      'edit-control',
            "orderable":      false,
            "data":           null,
            "defaultContent": "<center>Edit flat</center>" 
        },
        { 
            "targets": -1,
            "className":      'suppr-control',
            "orderable":      false,
            "data":           null,
            "defaultContent": "<center>Delete flat</center>"
        },
        {
            "targets": -1,
            "className":      'details-control',
            "orderable":      false,
            "data":           null,
            "defaultContent": "<center>Infos rapide</center>"
        }
        ],
        "order": [[0, 'asc']]
    } );
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );

        if ( row.child.isShown() ) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
    $('#example tbody').on('click', 'td.edit-control', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var input = prompt("Enter the new name of data base");
        if (input === null) {
            return;
        }
        else
        {
            $.ajax({
                method: "PUT",
                url: 'http://my-phpmyadmin.cloudapp.net/api/database',
                headers: {
                    "Authorization": getCookie('token')
                },
                data: {"old_name": data.name, "new_name": input},
                success: function(data){
                    console.log(data);
                    window.location.reload(true);
                },
                error:function(data){
                    $("#alert").remove();
                    $("#create").append('<div id="alert" class="alert alert-warning">Erreur lors de la création d\'une base de données.</div>')}
                });
        }
    } );
    $('#example tbody').on('click', 'td.suppr-control', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var r = confirm("Do you confirm?");
        if (r == true) {
            $.ajax({
                type: "DELETE",
                url: 'http://localhost:3000/Flats/' + data._id,              
                //data: {"_id": data._id},
                success: function(data){
                    console.log(data);
                    window.location.reload(true);
                },
                error:function(data){
                    console.log(data);
                    $("#alert").remove();
                    $("#create").append('<div id="alert" class="alert alert-warning">Erreur lors de la suppression.</div>')}
            });    
        }
    } );
    $('#example tbody').on( 'click', 'td.database_click', function () {
        var data = table.row( $(this)).data();
        window.location.href='/table?database='+data.id_poste;
    });
});
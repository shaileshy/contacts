
$(document).ready(function(){

    var contact_array = [];
    if (localStorage.getItem('contact_array')){
        var data_content =JSON.parse(localStorage.getItem('contact_array'));
        if(data_content){
            contact_array = data_content;
        }
        for(var i=0;i<data_content.length;i++){
            $(".saved_contact").append("<div class='contact'><div>"+data_content[i].first_name+" "+data_content[i].last_name+"</div>"+"<div>"+data_content[i].email_id+"</div></div>");
        }

    }
    $("#add_contact").hide();
    $(".delete").hide();
    $(".edit").hide();
    $("#add_button").click(function(){
        $(".delete").hide();
        $(".edit").hide();
        $("#save_button").show();
        $("#form").trigger('reset');
        $("#add_contact").show();
    });
    $(".cancel").click(function(){
        $("#form").trigger('reset');
        $("#add_contact").hide();
    });
    $("#save_button").click(function(){
        var first_name = $(".first_name").val();
        var last_name = $(".last_name").val();
        var mobile_no = $(".mobile_number").val();
        var email_id = $(".email_id").val();
        var contact_details = {
            'first_name':first_name,
            'last_name':last_name,
            'mobile_number':mobile_no,
            'email_id':email_id
        };

        contact_array.push(contact_details);
        localStorage.setItem('contact_array',JSON.stringify(contact_array));
        for(i=contact_array.length-1;i<contact_array.length;i++){
            debugger;
            $(".saved_contact").append("<div class='contact'><div>"+contact_array[i].first_name+" "+contact_array[i].last_name+"</div>"+"<div>"+email_id+"</div></div>");
        }
        $("#add_contact").hide();
    });

    $(document).on('click','.contact',function(e){
        $('.contact').removeClass('selected');
        var div_index = $(e.target).closest('.contact').addClass('selected').index() - 1;
        $("#form").trigger('reset');
        $("#add_contact").show();
        $(".first_name").val(contact_array[div_index].first_name);
        $(".last_name").val(contact_array[div_index].last_name);
        $(".mobile_number").val(contact_array[div_index].mobile_number);
        $(".email_id").val(contact_array[div_index].email_id);
        $(".delete").show();
        $(".edit").show();
        $("#save_button").hide();

    });

    $(document).on('click','.delete',function(){
        debugger;
        contact_array.splice($(".selected").index()-1,1);
        $(".selected").remove();
        localStorage.setItem('contact_array',JSON.stringify(contact_array));
        $("#form").trigger('reset');
        $("#add_contact").hide();
    });
    $(document).on('click','.edit',function(){
        debugger;
        var selected_contact = $(".selected").index()-1;
        $('.contact').removeClass('selected');
        var first_name = $(".first_name").val();
        var last_name = $(".last_name").val();
        var mobile_no = $(".mobile_number").val();
        var email_id = $(".email_id").val();
        var edited_contact = "<div class='contact'><div>"+first_name+" "+last_name+"</div><div>"+email_id+"</div></div>";
        $(".selected").replaceWith(edited_contact);
        var edited_contact_details = {
            'first_name':first_name,
            'last_name':last_name,
            'mobile_number':mobile_no,
            'email_id':email_id
        };
        contact_array.splice(selected_contact,1,edited_contact_details);
        localStorage.setItem('contact_array',JSON.stringify(contact_array));
    });
});
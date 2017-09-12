

$(document).ready(function(){

    // console.log('logging from the utils.js file after document load.');
    $('#mainNav').affix({
    offset: {
        top: 100
      }
    });


    $("form#feedback_form").submit(function(event){
        event.preventDefault();

        var full_name = $('#feedback_form #full_name')
        var email = $('#feedback_form #email')
        var subject = $('#feedback_form #subject')
        var message = $('#feedback_form #message')


        $.post('send_feedback', {

        full_name: full_name.val(),
        email : email.val(),
        subject : subject.val(),
        message : message.val()
      },
          function(returnedData){
            if(returnedData.success){
              $('form#feedback_form').trigger("reset");
              console.log("succesfully send msg");
              $('.hide-msg').toggle();
              setTimeout(function(){
                  $('.hide-msg').toggle();
              }, 5000);
            }
      }).fail(function(){
            console.log("error");
      });




    });


    var selected_brochure='';

    $( "#brochure_type_selected" ).change(function() {
        if($( "#brochure_type_selected option:selected" ).val() !==''){
          // console.log('not emplty');
          $("#brochure_type button[type='submit']").prop("disabled", false);
        }else{
          // console.log('emplty');
          $("#brochure_type button[type='submit']").prop("disabled", true);
        }
    });

     
    
    $("#brochure_type button[type='submit']").click(function(){
      selected_brochure = $( "#brochure_type_selected" ).val();
      // console.log(selected_brochure);
     

      $('#personal_info_brochure').modal('show');
      $('#brochure_type').modal('hide');
    });
    



    $( "form#brochure_form" ).submit(function( event ) {
      event.preventDefault();

      var full_name = $('#brochure_form #info_full_name').val();
      var address = $('#brochure_form #address').val();
      var company_name = $('#brochure_form #company_name').val();
      var interested_in = $('#brochure_form #interested_in').val();
      var email = $('#brochure_form #info_email').val();



      $('#personal_info_brochure').modal('hide');

      base_url = window.location.protocol + "//" + window.location.host + "/";

      if(selected_brochure=='hotel' || ''){
        window.open(base_url + 'pdfjs/web/viewer.htm?file=StayCompass-Hotels.pdf');
      }else if(selected_brochure=='Advertisers'){
        window.open(base_url + 'pdfjs/web/viewer.htm?file=StayCompass-Advertisers.pdf');
      }

      if(email){
          $.ajax({
            type: 'POST',
            url: '/save_user_info_brochure',
            data: "full_name=" + full_name + "&address=" + address + "&company_name=" + company_name + "&interested_in=" + interested_in + "&email=" + email,
            dataType: 'html',
            success: function(result){
              console.log( "error" );
            },
            error: function(error){
                console.log( "error" );
            }
        });
      }

    });






    $('.feature_icon').click(function(ev){
      ev.preventDefault();
      var abc = $(this).attr('data-id');
      abc = Number(abc);

      var feature_content= $('.feature_content').children();



      if(abc === 0){
        $('.personalization_div').addClass('active');
        $('.personalization_div').siblings().removeClass('active');
      }else if( abc === 1){
        $('.user_experience_div').addClass('active');
        $('.user_experience_div').siblings().removeClass('active');
      }else if(abc === 2){
        $('.easy_platform_div').addClass('active');
        $('.easy_platform_div').siblings().removeClass('active');
      }else if(abc === 3){
        $('.local_partners_div').addClass('active');
        $('.local_partners_div').siblings().removeClass('active');
      }

    });



    $('.feature-body .row:first > div').matchHeight();

    $('.compay_info .container > .row:first-child > div').matchHeight();




    (function(){

      var elements_before_edit;
      var wrapper_element_to_edit;

      $('#step2_content').on('click', '.edit_guest_services_element', function(event) {
          wrapper_element_to_edit = $(this).closest(".guest_services_elemnt");
          elements_before_edit = wrapper_element_to_edit.children();
          var heading = wrapper_element_to_edit.find($(".guest_services_elemnt h4")).text();
          var description = wrapper_element_to_edit.find($(".description")).text();


          var form_element='<div class="form-group"><label for="airlines">' + heading + '</label><textarea class="form-control textarea_form_description" rows="10">' + description
                    +  '</textarea><div class="form_element_btn pull-right"><button class="btn btn-default update_guest_services_element" type="submit">Update</button><button class="btn btn-default cancel_guest_services_element" type="submit">Cancel</button></div><div class="clear_both"></div></div>';

          wrapper_element_to_edit.html(form_element);

        });


        $('#step2_content').on('click', '.cancel_guest_services_element', function(event) {
              wrapper_element_to_edit.empty();
              wrapper_element_to_edit.append(elements_before_edit);
        });

        $('#step2_content').on('click', '.update_guest_services_element', function(event) {

             description_value=$(this).closest(".guest_services_elemnt").find('.textarea_form_description').val();

              wrapper_element_to_edit.empty();
              wrapper_element_to_edit.append(elements_before_edit);


                wrapper_element_to_edit.find($(".description")).text(description_value);
              // wrapper_element_to_edit.find('.description').text(description_value);

                // elements_before_edit.find(".description").val(description_value);


        });


        var navListItems = $('div.setup-panel div a'),
                allWells = $('.setup-content'),
                allNextBtn = $('.nextBtn'),
        		  allPrevBtn = $('.prevBtn');

        var intermediate_to_hold_prev_obj = [];

        allWells.hide();

        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                    $item = $(this);

            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('btn-primary').addClass('btn-default');
                $item.addClass('btn-primary');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
        });

        allPrevBtn.click(function(){
                var curStep = $(this).closest(".setup-content"),
                curStepBtn = curStep.attr("id"),
                prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

                prevStepWizard.removeAttr('disabled').trigger('click');

                $('#generic_hotem_form').on('click', '.step2_prev', function(event) {
                  intermediate_to_hold_prev_obj.push($('#step2_content'));
                });
        });

        allNextBtn.click(function(){

          if(intermediate_to_hold_prev_obj.length>0){
            last_element = intermediate_to_hold_prev_obj.pop();
            var unchanged_children = $(last_element[0]).children();
            $('#step2_content').empty().append(unchanged_children);
          }else{
              function validate(property){

                if(property == ''){
                  return true;
                }
                  return false;
              }

              if($(this).attr('id') == 'step1_button'){
                  /* remove any previous added error class */
                  $('label').removeClass('label_error');
                  $('input').removeClass('input_error');

                  var property_name = $('#property_name');
                  var street = $('#street');
                  var city = $('#city');
                  var state = $('#state');
                  var zip = $('#zip');
                  var phone_number = $('#phone_number');
                  var website = $('#website');
                  var form_validity = true;

                  if(validate(property_name.val())){
                      property_name.addClass('input_error');
                      property_name.prev().addClass('label_error');
                      form_validity = false;
                  }

                  if(validate(street.val())){
                      street.addClass('input_error');
                      street.prev().addClass('label_error');
                      form_validity = false;
                  }

                  if(validate(city.val())){
                      city.addClass('input_error');
                      city.prev().addClass('label_error');
                      form_validity = false;
                  }

                  if(validate(state.val())){
                      state.addClass('input_error');
                      state.prev().addClass('label_error');
                      form_validity = false;
                  }

                  if(validate(zip.val())){
                      zip.addClass('input_error');
                      zip.prev().addClass('label_error');
                      form_validity = false;
                  }

                  if(validate(phone_number.val())){
                      phone_number.addClass('input_error');
                      phone_number.prev().addClass('label_error');
                      form_validity = false;
                  }

                  if(validate(website.val())){
                      website.addClass('input_error');
                      website.prev().addClass('label_error');
                      form_validity = false;
                  }

                  if(form_validity == false){
                    console.log('form invalid');
                    return false;
                  }


                  $.post('save_company_detail', {
                    property_name: property_name.val(),
                    street : street.val(),
                    city : city.val(),
                    state: state.val(),
                    zip: zip.val(),
                    phone_number: phone_number.val(),
                    website: website.val()
                  },
                  function(returnedData){
                    // debugger;
                      for (i = 0; i < returnedData.guest_services.length; ++i) {
                            var form_row='<div class="guest_services_elemnt" id="'+ returnedData.guest_services[i]._id +'" data_guest_property_id="'+ returnedData.guest_services[i].guest_property_detail_id +'"><h4>' + returnedData.guest_services[i].title + '</h4><div class="description" data-title="'+ returnedData.guest_services[i].title.toLowerCase() +'">' + returnedData.guest_services[i].description + '</div><div class="apply_radio_button"><label class="radio-inline"><input type="radio" name="'+ returnedData.guest_services[i].title.toLowerCase() +'" id="inlineRadio1" value="true"'+
                            (returnedData.guest_services[i].apply==true ? ' checked="checked"' : '')
                            +'> Applicable</label><label class="radio-inline"><input type="radio" name="'+ returnedData.guest_services[i].title.toLowerCase() +'" id="inlineRadio2" value="false"> Not Applicable</label></div><button class="btn btn-default edit_guest_services_element" type="submit">Edit</button></div>';

                          $("#step2_content").append(form_row);
                      }
                  }).fail(function(){
                        console.log("error");
                  });

              }else if($(this).attr('id') == 'step2_next'){

                var form_items=$('.guest_services_elemnt');
                var arr = [];

                $.each(form_items, function( i, val ) {
                  var id = $(val).attr('id');
                  var data_guest_property_id = $(val).attr('data_guest_property_id');
                  var description = $(val).find('.description').text();
                  var apply = $(val).find('input:checked').val();
                  var form_item_obj = {id: id, data_guest_property_id: data_guest_property_id, description: description, apply: apply};
                  arr.push(form_item_obj);

                });


                $.post('save_guest_service_detail', {
                    arr: arr
                },
                function(returnedData){
                  debugger;
                    // for (i = 0; i < returnedData.guest_services.length; ++i) {
                    //       var form_row='<div class="guest_services_elemnt" id="'+ returnedData.guest_services[i]._id +'" data_guest_property_id="'+ returnedData.guest_services[i].guest_property_detail_id +'"><h4>' + returnedData.guest_services[i].title + '</h4><div class="description" data-title="'+ returnedData.guest_services[i].title.toLowerCase() +'">' + returnedData.guest_services[i].description + '</div><div class="apply_radio_button"><label class="radio-inline"><input type="radio" name="'+ returnedData.guest_services[i].title.toLowerCase() +'" id="inlineRadio1" value="true"'+
                    //       (returnedData.guest_services[i].apply==true ? ' checked="checked"' : '')
                    //       +'> Applicable</label><label class="radio-inline"><input type="radio" name="'+ returnedData.guest_services[i].title.toLowerCase() +'" id="inlineRadio2" value="false"> Not Applicable</label></div><button class="btn btn-default edit_guest_services_element" type="submit">Edit</button></div>';
                    //
                    //     $("#step2_content").append(form_row);
                    // }
                }).fail(function(){
                      console.log("error");
                });







                  // var description = $('*[data-description="airlines_description"]').text();
                  // var apply = $('*[data-description="airlines_description"]').text();

                  // var title = $();


                  // var street = $('#street');
                  // var city = $('#city');
                  // var state = $('#state');
                  // var zip = $('#zip');
                  // var phone_number = $('#phone_number');
                  // var website = $('#website');
                  // var form_validity = true;

              }

          }


            var curStep = $(this).closest(".setup-content"),
                curStepBtn = curStep.attr("id"),
                nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                curInputs = curStep.find("input[type='text'],input[type='url']"),
                isValid = true;

            $(".form-group").removeClass("has-error");
            for(var i=0; i<curInputs.length; i++){
                if (!curInputs[i].validity.valid){
                    isValid = false;
                    $(curInputs[i]).closest(".form-group").addClass("has-error");
                }
            }

            if (isValid)
                nextStepWizard.removeAttr('disabled').trigger('click');
        });

        $('div.setup-panel div a.btn-primary').trigger('click');











        // var navListItems = $('div.setup-panel div a'),
        //         allWells = $('.setup-content'),
        //         allNextBtn = $('.nextBtn');
        //
        // allWells.hide();
        //
        // navListItems.click(function (e) {
        //     e.preventDefault();
        //     var $target = $($(this).attr('href')),
        //             $item = $(this);
        //
        //     if (!$item.hasClass('disabled')) {
        //         navListItems.removeClass('btn-primary').addClass('btn-default');
        //         $item.addClass('btn-primary');
        //         allWells.hide();
        //         $target.show();
        //         $target.find('input:eq(0)').focus();
        //     }
        // });
        //
        // allNextBtn.click(function(){
        //     var curStep = $(this).closest(".setup-content"),
        //         curStepBtn = curStep.attr("id"),
        //         nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        //         curInputs = curStep.find("input[type='text'],input[type='url']"),
        //         isValid = true;
        //
        //     $(".form-group").removeClass("has-error");
        //     for(var i=0; i<curInputs.length; i++){
        //         if (!curInputs[i].validity.valid){
        //             isValid = false;
        //             $(curInputs[i]).closest(".form-group").addClass("has-error");
        //         }
        //     }
        //
        //     if (isValid)
        //         nextStepWizard.removeAttr('disabled').trigger('click');
        // });
        //
        // $('div.setup-panel div a.btn-primary').trigger('click');
        //

        /* start :: add more button */
        // $('.add_form_url_field').click(function(e){
        //     e.preventDefault();
        //
        //     var form_row_html = '<div class="form-group"><label   for="airlines">Airlines</label><textarea class="form-control" rows="3" id="airlines"></textarea></div>';
        //
        //     // var form_row_html = '<tr class="row"><td class="col-sm-8"><input type="text" name="project[sites_attributes][][url]" id="project_sites_attributes__url" placeholder="http://url-to-scrape" class="form-control" /></td><td class="col-sm-3"><select name="project[sites_attributes][][frequency]" id="project_sites_attributes__frequency" class="form-control select-icon"><option value="one-time">One Time</option><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select></td><td class="col-sm-1 tbl-valign"><span class="glyphicon glyphicon-minus-sign remove-form_row_html"></span></td></tr>';
        //
        //      $('.guest_sevices_list table').append(form_row_html);
        //
        // });
        //
        //
        // $('.guest_sevices_list table').delegate(".remove-form_row_html", "click", function(e){
        //   e.preventDefault();
        //    $(this).closest('tr').remove();
        //
        // });
        /* end :: add more button */

        $(':input:checked').parent('.btn').addClass('active');

    })();



});

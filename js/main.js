var map = {
    "steps": [
        {
            "id": 1, "title": "APPLY",
            "substeps": [{
                "id": 1,
                "name":"basicinfo",
                "title": "Basic Info",
                "checked": false,
                "general_info": "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                "fields": [{"id": "Name", "name": "Name","summary_name":"Name", "alt": "", "type": "name", "value": "", "checked": false},
                    {"id": "Email", "name": "Email","summary_name":"Email", "alt": "", "type": "email", "value": "", "checked": false},
                    {
                        "id": "DOB",
                        "name": "Date of Birth",
                        "summary_name":"Date of Birth",
                        "alt": "Enter your birthday",
                        "type": "date",
                        "value": "",
                        "checked": false
                    },
                    {
                        "id": "HaveYouStudied",
                        "name": "Have you studied before?",
                        "summary_name":"hide",
                        "type": "radio",
                        "value": "",
                        "checked": true,
                        "options": [{
                            "id":"0",
                            "title": "Yes",
                            "description": "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                            "value": "0"
                        },
                            {
                                "id":"1",
                                "title": "No",
                                "description": "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                                "value": "1"
                            }]
                    },
                    {
                        "id": "WhatHaveYouStudied",
                        "name": "What have you studied?",
                        "summary_name":"Study history",
                        "alt": "Choose the course you've studied here...",
                        "type": "select",
                        "value": "",
                        "checked": true,
                        "options": ["Sample course 1", "Sample course 2", "Sample course 3", "Sample course 4", "Sample course 5"]
                    }
                ]
            },
                {
                    "id": 2,
                    "name":"contactdetails",
                    "title": "Contact Details",
                    "checked": false,
                    "general_info": "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                    "fields": [{
                        "id": "Phone",
                        "name": "Phone",
                        "summary_name":"Phone",
                        "alt": "",
                        "type": "tel",
                        "value": "",
                        "checked": false
                    },
                        {"id": "Mobile", "name": "Mobile","summary_name":"Mobile", "alt": "", "type": "tel", "value": "", "checked": false},
                        {
                            "id": "Address",
                            "name": "Address",
                            "summary_name":"Address",
                            "alt": "Street",
                            "type": "text",
                            "value": "",
                            "checked": false
                        },
                        {"id": "Sub", "name": "","summary_name":"", "alt": "Sub", "type": "text", "value": "", "checked": false},
                        {"id": "City", "name": "","summary_name":"", "alt": "City", "type": "text", "value": "", "checked": false},
                        {"id": "Region", "name": "","summary_name":"", "alt": "Region", "type": "text", "value": "", "checked": false},
                        {"id": "Country", "name": "","summary_name":"", "alt": "Country", "type": "text", "value": "", "checked": false}]
                }
            ]
        },
        {
            "id": 2, "title": "SELECT A COURSE",
            "substeps": [{
                "id": 1,
                "name":"selectacourse",
                "title": "Select a Course",
                "checked": false,
                "general_info": "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                "fields": [{
                    "id": "ChoseACourse",
                    "name": "",
                    "summary_name":"Selected course",
                    "alt": "choose a course",
                    "type": "select",
                    "value": "",
                    "checked": false,
                    "options": ["Sample course 1", "Sample course 2", "Sample course 3", "Sample course 4", "Sample course 5"]
                }
                ]
            }
            ]
        },
        {"id": 3, "title": "FINISH", "caption": "Summary", "substeps": []}
    ]
};

var current_step = 1;
var current_substep = 1;
var steps = map.steps;
var steps_quantity = steps.length;
var substeps_quantity = return_substeps_quantity(current_step);
var can_go_to_the_next_page = false;

function return_substeps_quantity(step_number) {
    let step = steps.find(function (item) {
        return item.id === step_number
    });
    return step.substeps.length;
}

$(function () {
    //when page loaded
    setup_main_content()
});

function remove_content() {
    $(".step").remove();
    $(".main_content").remove();
    $(".info").remove();
}


(function( $ ) {
    $.fn.selectbox = function() {

        var selectDefaultHeight = $('#selectBox').height();
        var rotateDefault = "rotate(0deg)";

        $('#selectBox > p.valueTag').click(function() {
            var currentHeight = $('#selectBox').height();
            if (currentHeight < 100 || currentHeight == selectDefaultHeight) {
                $('#selectBox').height("250px");
                $('img.arrow').css({borderRadius: "1000px", transition: ".2s", transform: "rotate(180deg)"});
            }

            if (currentHeight >= 250) {
                $('#selectBox').height(selectDefaultHeight);
                $('img.arrow').css({transform: rotateDefault});
            }
        });

        $('li.option').click(function() {
            $('#selectBox').height(selectDefaultHeight);
            $('img.arrow').css({transform: rotateDefault});
            $('p.valueTag').text($(this).text());
            $('p.valueTag').addClass("black_text");

            save_state(this,true);
            check_values();
        });
    };
})( jQuery );

//validation functions
function add_functions() {

    $('selector').selectbox();

    $("input[type='email']").on("blur", function () {
        let checked = false;
        if (validate_email(this.value)) {
            $(this).parent().removeClass("close");
            $(this).parent().addClass("ok");
            checked = true;
        } else {
            $(this).parent().removeClass("ok");
            $(this).parent().addClass("close");
            checked = false;
        }
        ;

        save_state(this, checked);
        check_values();
    });

    $("input[type='name']").on("blur", function () {
        let checked = false;
        if (validate_name(this.value)) {
            $(this).parent().removeClass("close");
            $(this).parent().addClass("ok");
            checked = true;
        } else {
            $(this).parent().removeClass("ok");
            $(this).parent().addClass("close");
            checked = false;
        }
        ;

        save_state(this, checked);
        check_values();
    });

    $("input[type='tel']").on("blur", function () {
        let checked = false;
        if (validate_phone(this.value)) {
            $(this).parent().removeClass("close");
            $(this).parent().addClass("ok");
            checked = true;
        } else {
            $(this).parent().removeClass("ok");
            $(this).parent().addClass("close");
            checked = false;
        }
        ;

        save_state(this, checked);
        check_values();
    });

    $("input[type='text']").on("blur", function () {
        let checked = false;
        if (validate_text(this.value)) {
            $(this).parent().removeClass("close");
            $(this).parent().addClass("ok");
            checked = true;
        } else {
            $(this).parent().removeClass("ok");
            $(this).parent().addClass("close");
            checked = false;
        }
        ;

        save_state(this, checked);
        check_values();
    });

    $("input[type='date']").on("blur", function () {
        let checked = true;

        save_state(this, checked);
        check_values();
    });



    $("input[type='radio']").on("click", function () {
        if(this.id=== "0"){
            $(".input_row_select").removeClass("unvisible");
        }else {
            $(".input_row_select").addClass("unvisible");
        }

        save_state(this, this.checked);
        check_values();
    });

    $("input[type='select']").on("blur", function () {

        save_state(this, this.checked);
        check_values();
    });
}

function validate_email(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validate_name(name) {
    let re = /^[A-Za-z\s]+$/;
    return re.test(String(name).toLowerCase());
}

function validate_phone(phone) {
    let re = /^[\+]?[0-9\-\(\)]+$/;
    return re.test(String(phone).toLowerCase());
}

function validate_text(text) {
    let re = /^[A-Za-z0-9]+$/;
    return re.test(String(text).toLowerCase());
}

function validate_date(text) {
    let re = /^(\d{2}|\d{1})[\.\/](\d{2}|\d{1})[\.\/]\d{4}$/;
    return re.test(String(text).toLowerCase());
}

//-validation functions

//button next
function next() {
    if (can_go_to_the_next_page) {
        current_substep++;
        if (current_substep > substeps_quantity) {
            current_step++;
            current_substep = 1;
            substeps_quantity = return_substeps_quantity(current_step);
        }
        remove_content();
        setup_main_content();
        check_values();
    }
}

//button previous
function previous() {
    current_substep--;
    if (current_substep === 0) {
        current_step--;
        substeps_quantity = return_substeps_quantity(current_step);
        current_substep = substeps_quantity;
    }
    remove_content();
    setup_main_content();
    check_values();
}

//button submit
function submit() {
    //remove_content();
    //setup_main_content_submit()
}

//save a state in json
function save_state(current_field, checked) {
    let step = steps.find(function (item) {
        return item.id === current_step
    });

    let substep = step.substeps.find(function (item) {
        return item.id === current_substep
    });

    switch (current_field.type) {
        case 'date':
            var field = substep.fields.find(function (item) {
                return item.id === current_field.id
            });

            field.value = current_field.value;
            field.checked = checked;
            break;
        case  'radio':
            var field = substep.fields.find(function (item) {
                return item.id === current_field.parentElement.id
            });

            field.value = current_field.id;
            field.checked = checked;

            let options = field.options;
            options.forEach(function (item) {
                if(item.id === current_field.id){
                    item.value = "1";
                }else {
                    item.value = "0";
                }

            });
            break;
        case 'select':
            var field = substep.fields.find(function (item) {
                return item.id === current_field.id
            });

            field.value = $(current_field).text();
            field.checked = checked;
            break;
        default:
            var field = substep.fields.find(function (item) {
                return item.id === current_field.id
            });

            field.value = current_field.value;
            field.checked = checked;
            break;
    }
}

//check values for button next
function check_values() {
    let step = steps.find(function (item) {
        return item.id === current_step
    });

    let substep = step.substeps.find(function (item) {
        return item.id === current_substep
    });

    let checked = true;
    let fields = substep.fields;
    fields.forEach(function (item) {
        checked = checked && item.checked;
    });
    substep.checked = checked;
    can_go_to_the_next_page = checked;
    if (checked) {
        $("#next").addClass("checked");
        if (substep.id === current_substep) {
            $("#substep_checkbox" + substep.name)[0].src = "images/v2.png";
        } else {
            $("#substep_checkbox" + substep.name)[0].src = "images/v1.png";
        }
    } else {
        $("#next").removeClass("checked");
        $("#substep_checkbox" + substep.name)[0].src = "images/v0.png";
    }
}

//function show a main content
function setup_main_content() {
    let menu = '';
    let info = '';
    let content = '';
    steps.forEach(function (item) {
        let step_id = item.id;
        let step_title = item.title;
        menu = menu + '<div class="step" id=step' + step_id + '><span class="step_id">' + step_id + ' </span><span class="step_title">' + item.title + '</span>';

        if (step_title === "FINISH") {
            if (current_step === steps_quantity) {
                content = content + '<div class="main_content"><div>' + item.caption.toUpperCase() + '</div>';

                let finish_steps = steps;
                finish_steps.forEach(function (item) {
                    let finish_substeps = item.substeps;
                    finish_substeps.forEach(function (item) {
                        let finish_fields = item.fields;
                        finish_fields.forEach(function (item, i, finish_fields) {
                            //summary
                            if(item.summary_name==="none"){

                            }else if(item.summary_name==="Name"){
                                content = content + '<div class="summary_div"><span class="summary_name">' + item.value + '</span></div>';
                            }else {
                                content = content + '<div class="summary_div"><span class="summary_title">' + (item.summary_name===""? "":item.summary_name+":") + '</span><span class="summary_value">' + item.value + '</span> </div>';
                            }
                        });
                    })
                })

                content = content + '<div class="buttons"><button id="previous" onclick="previous()"><img class="arrows" src="images/arrow_left.png" >PREVIOUS</button><button id="submit" onclick="submit()">SUBMIT<img class="arrows" src="images/arrow_right.png" ></button></div></div>';
            }
        } else {
            let substeps = item.substeps;
            substeps.forEach(function (item) {
                //block MENU
                menu = menu + '<div class="' + (item.id === current_substep & step_id === current_step ? 'current substep' : 'substep') + '"><img class="substep_arrow" src="images/' + (item.id === current_substep & step_id === current_step ? 'y2.png' : 'y1.png') + '">' + item.title.toLowerCase() + '<img class="substep_checkbox" id="substep_checkbox' + item.name + '" src="images/' + (item.checked ? (item.id === current_substep & step_id === current_step ? 'v2.png' : 'v1.png') : 'v0.png') + '"></div>';

                if (item.id === current_substep & step_id === current_step) {
                    //block INFO
                    info = info + '<div class="info"><div class="info_title">GENERAL INFORMATION</div><div class = "general_info_block"><div class="general_info_block_title">Step ' + step_id + ' ' + item.title + '</div><div class = "general_info_block_info">' + item.general_info + '</div></div>';

                    //block CONTENT
                    content = content + '<div class="main_content"><div class="main_content_title">' + item.title.toUpperCase() + '</div>';
                    let fields = item.fields;
                    fields.forEach(function (item) {

                        switch (item.type) {
                            case 'date':
                                content = content + '<div class="input_row"><span>' + item.name + '</span><input type="' + item.type + '" id="' + item.id + '" placeholder="' + item.alt + '" autocomplete="off" value="' + item.value + '"></div>';
                                break;
                            case 'radio':
                                let item_id = item.id;
                                content = content + '<div class="input_row_radio"><div>' + item.name + '</div><div><form id ="'+item_id+'">';

                                let options = item.options;
                                options.forEach(function (item) {
                                    content = content + '<input type="radio" name="' + item_id + '" value = "'+item.value + '" id="'+item.id+'">' + item.title + '<br><div class="radio_description">' + item.description + '</div>';
                                });
                                content = content + '</div></form></div>';
                                break;
                            case 'select':
                                /* version 1
                                content = content + '<div class="input_row_select"><div>' + item.name + '</div><select>';
                                let select_options = item.options;
                                select_options.forEach(function (item) {
                                    content = content + '<option value="' + (item) + '">' + item + '</option>';
                                });
                                content = content + '</select></div>';*/

                                content = content + '<div class="input_row_select'+(item.id==="ChoseACourse"? "1": "")+'"><div>' + item.name + '</div><div id="selectBox"><img src="./images/arrow_down.png" class="arrow" /><p class="valueTag'+(item.value==="" ? "" : " black_text")+'" name="select">'+(item.value==="" ? item.alt : item.value)+'</p><ul id="selectMenuBox">';
                                let select_options = item.options;
                                let id_item = item.id;
                                select_options.forEach(function (item) {
                                    content = content + '<li class="option" type="select" id="'+id_item+'" value="' + (item) + '">' + item + '</li>';
                                });
                                content = content + '</ul></div></div>';

                                break;
                            default:
                                content = content + '<div class="input_row ' + (item.checked ? 'ok' : 'close') + '"><span>' + item.name + '</span><input type="' + item.type + '" id="' + item.id + '" placeholder="' + item.alt + '" autocomplete="off" value="' + item.value + '"></div>';
                                break;
                        }

                    });


                    //add buttons
                    if (current_step === 1 & current_substep === 1) {
                        //one button
                        content = content + '<div class="buttons"><button id="next" onclick="next()">NEXT<img class="arrows" src="images/arrow_right.png" ></button></div></div>';
                    } else {
                        //two buttons
                        content = content + '<div class="buttons"><button id="previous" onclick="previous()"><img class="arrows" src="images/arrow_left.png" >PREVIOUS</button><button id="next" onclick="next()">NEXT<img class="arrows" src="images/arrow_right.png" ></button></div></div>';
                    }

                    content = content + '</div>';

                }
            });
        }
        menu = menu + '</div>';
        info = info + '</div>';

        //alert( i + ": " + item + " (массив:" + steps + ")" );
    });
    $('#menu').append(menu);
    $('#content').append(content);
    $('#info').append(info);

    let radio_button = $("input[name='HaveYouStudied']");
    let lenght_radio_button = radio_button.length-1;
    for(i=0;i<=lenght_radio_button;i++){
        radio_button[i].checked = radio_button[i].value === "1";
    }

    if(lenght_radio_button>0 && radio_button[0].checked){
        $(".input_row_select").removeClass("unvisible");
    }else {
        $(".input_row_select").addClass("unvisible");
    }


    add_functions();
}

function setup_main_content_submit() {

}




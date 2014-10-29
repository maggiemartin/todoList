var my_server = 'http://tiy-atl-fe-server.herokuapp.com/collections/magsthings';

  var Task = function (options) {

  options = options || {};
  this.item = options.item || '';
  this.status = 'false';

};

var task_list;
var task_template = $('#task_items').html();
var rendered = _.template(task_template);

//set up JSON server
$.getJSON(my_server).done( function(data){
  task_list = data;

  _.each(task_list, function(item){
    $('#Task_List').append(rendered(item))
  })

})
var add_task = function(){
  var input = $('#task-item').val();
  if (input === '') {
    return;
  };
  task = new Task({
    item: input,
    status:$(this).status,

  });

  $.ajax({
    type: 'POST',
    url: my_server,
    data: task
  }).done(function(data){

  task_list.push(data);

  $('#Task-List').append(rendered(data));
  $('#task-item').val('');
});

};



$('#btnNew').on('click', function
(event){

  event.preventDefault();
  add_task();

});

$("#task-item").keyup(function (e) {
    if (e.keyCode == 13) {
    add_task();

    }
});
var checked;
$('#Task-List').on('click', 'li', function
(event){
  event.preventDefault();
  var myID = $(this).attr('id')
  checked = _.findWhere(task_list, {_id:myID});

  if (checked.status === 'true') {
    checked.status = 'false';
    $(this).removeClass('done');
  } else {
    checked.status = 'true';
    $(this).addClass('done');
  }

$.ajax({
  type: 'PUT',
  url: my_server + "/" + checked._id,
  data: checked
})
});


$('#deleteAll').click( function(){

  $('ul').empty();
  //make ajax delete all objects in the array also//
});
$.getJSON(my_server).done(function (status_data){



  var incomplete =_.where(status_data, {status: "false"});
  var incomplete_total = incomplete.length;

  var complete =_.where(status_data, {status: "true"});
  var complete_total = complete.length;
  //var incomplete = _.where(my_erver, {status : "false"});
  $('.tally').html(''+incomplete_total + ' Incomplete' + <br> + '' +complete_total + ' Completed');
});
//get task.item in span/li
//find match to this^ in task list array
//change status


//list item will look like this
//<li><input type="checkbox" /><span>Do this thing</span></li>


/*function addNewItem(list) {
  var listItem = document.createElement("li");
  listItem.innerText = "hey asshole";
  list.appendChild(listItem);
}
var btnNew = document.getElementById("btnAdd");
btnNew.onclick = function () {
  addNewItem(document.getElementById("todoList"));
};
*/

var my_server = 'http://tiy-atl-fe-server.herokuapp.com/collections/magsthings';

  var Task = function (options) {

  options = options || {};
  this.item = options.item || '';
  this.status = options.status || 'false';
  this.checked = function(){
    this.status = 'true';
  };
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

$('#Task-List').on('click', 'li', function
(event){
  event.preventDefault();
  $(this).css('text-decoration' ,'line-through');


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

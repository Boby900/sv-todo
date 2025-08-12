<script>
    let tasks = [];
 const addTask = async () => {
  console.log("task button clicked")  
 }
</script>

<h1 class="text-center text-2xl font-bold p-2">Hello and welcome to my todo-sv!</h1>

<div class="flex justify-center">
<form action="">
    <input class="border border-gray-300 rounded p-2" type="text" name="task" id="task" />
    <button class="bg-blue-500 rounded text-white p-2 m-2 cursor-pointer" type="submit" onclick={addTask}>Add Task</button>
</form>
</div>
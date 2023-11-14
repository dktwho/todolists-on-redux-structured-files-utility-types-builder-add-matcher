import React, {useCallback, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import { IconButton} from "@mui/material";
import {
    TodolistDomainType,
     todolistsThunks
} from "features/TodolistsList/model/todolists/todolistsSlice";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {TaskType} from "../../api/tasks/tasksApi.types";
import {FilterTasksButton} from "./FilterTasksButton/FilterTasksButton";
import {Tasks} from "./Tasks/Tasks";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
}

export const Todolist = React.memo(function (props: Props) {
    const {fetchTasks, addTask} = useActions(tasksThunks);

    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)

    useEffect(() => {
        fetchTasks(props.todolist.id);
    }, []);

    const addTaskCallback = useCallback(
        (title: string) => {
            addTask({title, todolistId: props.todolist.id});
        },
        [props.todolist.id],
    );

    const removeTodolistHandler = () => {
        removeTodolist(props.todolist.id);
    };

    const changeTodolistTitleHandler = useCallback(
        (title: string) => {
            changeTodolistTitle({id: props.todolist.id, title});
        },
        [props.todolist.id],
    );

    return (
        <div>
            <h3>
                <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === "loading"}/>
            <Tasks todolist={props.todolist} tasks={props.tasks}  />
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButton todolist={props.todolist}/>
            </div>
        </div>
    );
});

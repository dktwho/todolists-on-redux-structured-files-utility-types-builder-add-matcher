import React, {useCallback, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {Task} from "./Task/Task";
import {
    TodolistDomainType,
    todolistsActions, todolistsThunks
} from "features/TodolistsList/model/todolists/todolistsSlice";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {TaskStatuses} from "common/enums";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {TaskType} from "../../api/tasks/tasksApi.types";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
}

export const Todolist = React.memo(function (props: Props) {
    const {fetchTasks, addTask} = useActions(tasksThunks);
    const {changeTodolistFilter} = useActions(todolistsActions);
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

    const onAllClickHandler = useCallback(
        () => changeTodolistFilter({filter: "all", id: props.todolist.id}),
        [props.todolist.id],
    );
    const onActiveClickHandler = useCallback(
        () => changeTodolistFilter({filter: "active", id: props.todolist.id}),
        [props.todolist.id],
    );
    const onCompletedClickHandler = useCallback(
        () => changeTodolistFilter({filter: "completed", id: props.todolist.id}),
        [props.todolist.id],
    );

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {tasksForTodolist.map((t) => (
                    <Task
                        key={t.id}
                        task={t}
                        todolistId={props.todolist.id}
                    />
                ))}
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button
                    variant={props.todolist.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color={"inherit"}
                >
                    All
                </Button>
                <Button
                    variant={props.todolist.filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color={"primary"}
                >
                    Active
                </Button>
                <Button
                    variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});

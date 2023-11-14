import React from 'react';
import {Button} from "@mui/material";
import {useActions} from "../../../../../common/hooks";
import {TodolistDomainType, todolistsActions} from "../../../model/todolists/todolistsSlice";

type Props = {
    todolist: TodolistDomainType
}
export const FilterTasksButton = ({todolist}: Props) => {

    const {id, filter} = todolist
    const {changeTodolistFilter} = useActions(todolistsActions);
    const onAllClickHandler = () => {
        changeTodolistFilter({filter: "all", id})
    }
    const onActiveClickHandler = () => {
        changeTodolistFilter({filter: "active", id})
    }
    const onCompletedClickHandler = () => {
        changeTodolistFilter({filter: "completed", id})
    }

    return (
        <>
            <Button
                variant={filter === "all" ? "outlined" : "text"}
                onClick={onAllClickHandler}
                color={"inherit"}
            >
                All
            </Button>
            <Button
                variant={filter === "active" ? "outlined" : "text"}
                onClick={onActiveClickHandler}
                color={"primary"}
            >
                Active
            </Button>
            <Button
                variant={filter === "completed" ? "outlined" : "text"}
                onClick={onCompletedClickHandler}
                color={"secondary"}
            >
                Completed
            </Button>
        </>

    );
};


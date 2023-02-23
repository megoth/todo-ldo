import {ListShape} from "@/ldo/todo.typings";
import useSubject from "@/hooks/useSubject";
import {ListShapeFactory} from "@/ldo/todo.ldoFactory";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import styles from "./styles.module.css";
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import clsx from "clsx";
import ContentGroup from "@/components/contentGroup";
import Button from "@/components/button";
import Link from "next/link";
import {getListUrl} from "@/libs/list";

type DashboardListProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    listUrl: string | undefined;
    resourceUrl: string;
}

export default function DashboardList({className, listUrl, resourceUrl, ...props}: DashboardListProps) {
    const {
        data: list,
        error: listError,
        isLoading,
    } = useSubject<ListShape>(listUrl, resourceUrl, ListShapeFactory);

    if (!list || isLoading) {
        return <Loading />
    }

    if (listError) {
        return <ErrorDetails error={listError} />
    }

    return (
        <div className={clsx(styles.list, className)} {...props}>
            <h3>
                <Link href={getListUrl(list)}>{list.name}</Link>
            </h3>
            {list.task?.map((task) => (
                <ContentGroup key={task["@id"]}>{task.description}</ContentGroup>
            ))}
            {!list.task?.length && <div>There are no tasks in this list</div>}
            <Button shadow="half">Add task</Button>
        </div>
    )
}
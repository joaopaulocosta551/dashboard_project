import { BreadCrumbModel } from "@/models/breadcrumb.model";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import Link from "next/link";

export const BreadCrumb = (props: { segments: BreadCrumbModel[] }) => {
  const segments = props.segments ?? [];

  return (
    <Breadcrumb style={{ marginBottom: "0.5rem" }}>
      {segments.map((segment) => (
        <BreadcrumbItem key={segment.id} isCurrentPage={segment.isCurrent}>
          <BreadcrumbLink  href={segment.url} as={segment.isCurrent ? undefined : Link}>{segment.name}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

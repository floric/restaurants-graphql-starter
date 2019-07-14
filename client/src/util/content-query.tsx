import React, { ReactNode, Component } from "react";
import { Query } from "react-apollo";
import { DocumentNode } from "graphql";

export interface ContentQueryProps<Result, Variables> {
    query: DocumentNode;
    variables?: Variables;
    children: (data: Result) => ReactNode;
}

export class ContentQuery<Result, Variables = {}> extends Component<ContentQueryProps<Result, Variables>> {
    render() {
        const { query, variables, children } = this.props;
        return (<Query<Result>
            query={query}
            variables={variables}
        >
            {({ data, error, loading }) => {
                if (error) {
                    return <p>Error</p>;
                } else if (loading || !data) {
                    return <p>Loading...</p>;
                }

                return children(data);
            }}
        </Query>);
    }
}
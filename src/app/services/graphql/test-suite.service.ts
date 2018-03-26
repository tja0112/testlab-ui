import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

const TEST_SUITE_STRUCTURE = `
  id
  name
  testCases {
    id
  }
`;

@Injectable()
export class TestSuiteService {

  constructor(private apollo: Apollo) {

  }

  fetchTestSuites() {
    return this.apollo
      .watchQuery({
        query: gql`
          query TestSuitesQuery {
            findAllTestSuites {
              ${TEST_SUITE_STRUCTURE}
            }
          }`,
        fetchPolicy: 'network-only'
      })
      .valueChanges
      .map((response: any) => response.data.findAllTestSuites);
  }

  deleteTestSuite(id: string) {
    return this.apollo.mutate({
      mutation: gql`
         mutation DeleteTestSuiteeMutation($id: ID!) {
            deleteTestSuite(id: $id)
          }
         `,
      variables: { id },
    });
  }

  filterTestSuites(filter) {
    return this.fetchTestSuites();
  }

}

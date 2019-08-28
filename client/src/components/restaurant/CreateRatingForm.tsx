import React, { FC } from "react";

import { Button } from "../base/Button";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { TextareaAdapter } from "../base/Textarea";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { InputAdapter, Label } from "../base/Input";
import { Row, Col } from "../base/Grid";
import { SelectAdapter } from "../base/Select";

const GET_RESTAURANT_WITH_RATINGS = gql`
  query getRestaurant($id: String!) {
    restaurant(id: $id) {
      id
      averageRating
      ratings {
        items {
          id
          description
          title
          creationDate
          value
          user {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

const CREATE_RATING = gql`
  mutation createRating($createInput: CreateRatingInput!) {
    createRating(createInput: $createInput) {
      id
    }
  }
`;

interface ValueForm {
  title: string;
  description: string;
  rating: string;
}

const StyledEditorForm = styled.form``;

export const CreateRatingForm: FC<{ restaurantId: string }> = ({
  restaurantId
}) => {
  const [createRating] = useMutation<
    boolean,
    {
      createInput: {
        description: string;
        title: string;
        value: number;
        restaurantId: string;
      };
    }
  >(CREATE_RATING, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_RESTAURANT_WITH_RATINGS,
        variables: { id: restaurantId }
      }
    ]
  });

  const onSubmit: (form: ValueForm) => void = ({
    description,
    title,
    rating
  }) => {
    createRating({
      variables: {
        createInput: {
          description,
          title,
          value: Number.parseInt(rating),
          restaurantId
        }
      }
    });
  };

  return (
    <Form<ValueForm>
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine }) => (
        <StyledEditorForm onSubmit={handleSubmit}>
          <Row>
            <Col xs={4}>
              <Label htmlFor="title">Title</Label>
            </Col>
            <Col xs={8} fullWidth>
              <Field id="title" name="title" component={InputAdapter} />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Label htmlFor="description">Description</Label>
            </Col>
            <Col xs={8} fullWidth>
              <Field
                id="description"
                name="description"
                component={TextareaAdapter}
                fullWidth
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Label htmlFor="rating">Rating</Label>
            </Col>
            <Col xs={8} fullWidth>
              <Field
                id="rating"
                name="rating"
                component={SelectAdapter}
                fullWidth
                defaultValue="5"
              >
                {new Array(5).fill(1).map((_, val) => (
                  <option key={val} value={val + 1}>
                    {val + 1}
                  </option>
                ))}
              </Field>
            </Col>
          </Row>
          <Button type="submit" loading={submitting} disabled={pristine}>
            Submit
          </Button>
        </StyledEditorForm>
      )}
    />
  );
};

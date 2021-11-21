import {
  ADD_USER_TO_EVENT,
  GET_MOVIE_EVENT,
  REMOVE_USER_FROM_EVENT,
} from "helpers/graphql-queries";
import { useAlias, useMutationCall, useQueryCall } from "helpers/hooks";
import { AddUserToEvent, RemoveUserFromEvent } from "helpers/types";
import { useEffect, useState } from "react";
import { MovieEvent } from "src/helpers/types";

export function useMovieEvent(id: string) {
  const [alias] = useAlias();

  // Query for getting info about an event, network only as info is likely to change
  const [, { data: dataEvents }] = useQueryCall<MovieEvent>(
    GET_MOVIE_EVENT,
    false,
    undefined,
    true,
    {
      movieEventId: id,
      alias,
    },
  );

  // Add user to event mutation
  const [joinEvent, { data: joinData }] = useMutationCall<AddUserToEvent>(
    ADD_USER_TO_EVENT,
    undefined,
    {
      movieEventId: id,
      useralias: alias,
    },
  );

  // Remove user from event mutation
  const [leaveEvent, { data: leaveData }] = useMutationCall<RemoveUserFromEvent>(
    REMOVE_USER_FROM_EVENT,
    undefined,
    {
      movieEventId: id,
      useralias: alias,
    },
  );

  const [isParticipant, setIsParticipant] = useState<boolean>(false);

  // The useEffects update the isParticipant bool to reflect the current database changes
  useEffect(() => {
    if (dataEvents) setIsParticipant(dataEvents.movieEvent.userIsParticipant);
  }, [dataEvents]);

  useEffect(() => {
    setIsParticipant(
      leaveData && leaveData.removeUserFromEvent
        ? leaveData.removeUserFromEvent.userIsParticipant
        : isParticipant,
    );
  }, [leaveData]);

  useEffect(() => {
    setIsParticipant(
      joinData && joinData.addUserToEvent
        ? joinData.addUserToEvent.userIsParticipant
        : isParticipant,
    );
  }, [joinData]);

  // Sets the default values before the query goes through
  const movieData = dataEvents
    ? dataEvents.movieEvent
    : {
        title: "",
        description: "",
        location: "",
        date: "--.--.----",
      };
  return { isParticipant, movieData, joinEvent, leaveEvent };
}

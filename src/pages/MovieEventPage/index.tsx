import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { View } from "react-native";
import { Button, Card, Divider } from "react-native-paper";
import PageContainer from "src/components/PageContainer";
import { ParamList } from "types/navigation";
import MovieEventTextItem from "../../components/MovieEventTextItem";
import { useMovieEvent } from "./utils";

type Props = StackScreenProps<ParamList, "MovieEventPage">;

export default function MovieEventPage({ route }: Props) {
  const { MovieEventId: movieEventId } = route.params;
  const { isParticipant, movieData, joinEvent, leaveEvent } = useMovieEvent(movieEventId);
  return (
    <PageContainer
      title={movieData.title || "movie event"}
      footer={
        <View>
          {movieData && isParticipant ? (
            <Button mode="contained" onPress={() => leaveEvent()}>
              Leave Event
            </Button>
          ) : (
            <Button mode="contained" onPress={() => joinEvent()}>
              Join Event
            </Button>
          )}
        </View>
      }
    >
      <Card>
        <Card.Content>
          <View>
            <MovieEventTextItem title="Description" body={movieData.description} />
            <Divider />
            <MovieEventTextItem title="Location" body={movieData.location} />
            <Divider />
            <MovieEventTextItem
              title="Datetime"
              body={movieData.date.replace("T", " ").replace("Z", "").slice(0, -4)}
            />
            <Divider />
            <MovieEventTextItem
              title={"Status"}
              body={
                movieData && isParticipant
                  ? "You are a participant of this event"
                  : "You are not a participant of this event"
              }
            />
          </View>
        </Card.Content>
      </Card>
    </PageContainer>
  );
}

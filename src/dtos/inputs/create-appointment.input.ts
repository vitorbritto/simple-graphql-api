import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAppointmentInput {
    @Field()
    customerId: String;

    @Field()
    startsAt: Date;

    @Field()
    endsAt: Date;
}
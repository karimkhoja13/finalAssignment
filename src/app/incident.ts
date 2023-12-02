export class incident {
   reporter_name:string
   troublemaker_name:string
    location:string
    image_url:string
    problem_description:string
    reported_at:string
    status:string
    key:string

    constructor(reporter_name: string, 
        troublemaker_name: string, 
        location: string, 
        image_url:string, 
        problem_description:string, 
        reported_at:string, 
        status:string,
        key:string){
    this.reporter_name = reporter_name
    this.troublemaker_name = troublemaker_name
    this.location=location
    this.image_url =image_url
    this.problem_description = problem_description
    this.reported_at = reported_at
    this.status = status
    this.key = key
    }
}
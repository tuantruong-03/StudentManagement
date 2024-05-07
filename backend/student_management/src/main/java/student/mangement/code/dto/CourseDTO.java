package student.mangement.code.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import student.mangement.code.model.Course;

@Data
@AllArgsConstructor
public class CourseDTO {
    private Integer courseId;
    private String name;
	private Integer maxNumberOfStudent;
	private Integer currentNumberOfStudent;

    public CourseDTO(Course course, Integer currentNumberOfStudent) {
        this.courseId = course.getCourseId();
        this.name = course.getName();
        this.maxNumberOfStudent = course.getMaxNumberOfStudent();
        this.currentNumberOfStudent = currentNumberOfStudent;
    }


}

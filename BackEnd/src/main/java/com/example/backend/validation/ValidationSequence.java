package com.example.backend.validation;

import javax.validation.GroupSequence;
import static com.example.backend.validation.ValidationGroups.*;

@GroupSequence({NotBlankGroup.class, PatternGroup.class, SizeGroup.class})
public interface ValidationSequence {
}
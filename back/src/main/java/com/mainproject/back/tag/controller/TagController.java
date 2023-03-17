package com.mainproject.back.tag.controller;

import com.mainproject.back.tag.dto.TagSimpleDto;
import com.mainproject.back.tag.entity.Tag;
import com.mainproject.back.tag.mapper.TagMapper;
import com.mainproject.back.tag.service.TagService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
public class TagController {

  private final TagService tagService;
  private final TagMapper tagMapper;

  @GetMapping
  public ResponseEntity getAllTags() {
    List<TagSimpleDto> tagList = tagService.findAllTags().stream().map(tagMapper::tagToTagSimpleDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok().body(tagList);
  }
}

package com.mainproject.back.vocabulary.entity;

import com.mainproject.back.audit.Auditable;
import com.mainproject.back.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Vocabulary extends Auditable {

  @Id
  @Setter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
//  @Column(name = "vocab_id", nullable = false)
  private Long vocabId;

  @Setter
  @Column(nullable = false)
  private String word;

  @Setter
  @Column(nullable = false)
  private String meaning;

  @Column(nullable = false)
  private String langCode;

  @Setter
  @ManyToOne
  @JoinColumn(name = "member_id")
  private Member member;
}

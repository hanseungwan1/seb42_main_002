package com.mainproject.back.block.repository;

import com.mainproject.back.block.entity.Block;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface BlockRepository extends JpaRepository<Block, Long> {

  @Query(value = "select * from block where member_id = :memberId", nativeQuery = true)
  public Page<Block> findAllByMemberId(long memberId, Pageable pageable);

  @Query("select b.blockId from Block b where b.blockId = :blockId")
  Optional<Long> findBlockIdByBlockId(@Param("blockId") long blockId);
}

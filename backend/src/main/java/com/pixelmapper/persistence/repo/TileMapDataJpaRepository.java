package com.pixelmapper.persistence.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TileMapDataJpaRepository extends JpaRepository<TileMapDataEntity, UUID> {}

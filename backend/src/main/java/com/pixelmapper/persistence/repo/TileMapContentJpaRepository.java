package com.pixelmapper.persistence.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TileMapContentJpaRepository extends JpaRepository<TileMapContentEntity,UUID>{}

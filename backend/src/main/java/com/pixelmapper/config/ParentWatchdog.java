package com.pixelmapper.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component 
public class ParentWatchdog {

    @Value ("${app.parent-pid:0}")
    private long parentPid;

    @Scheduled (fixedDelay = 2000)
    void check() {
        if (parentPid > 0 && !ProcessHandle.of(parentPid).map(ProcessHandle::isAlive).orElse(false)) {
            System.exit(0);
        }
    }
}
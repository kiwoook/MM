package com.example.MM.api.controller.payment;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/payment")
public class paymentController {
    private final IamportClient iamportClient;

    @Value("${iamport.api}")
    private String APIkey;
    @Value("${iamport.secret}")
    private String secretKey;

    public paymentController() {
        this.iamportClient = new IamportClient(APIkey, secretKey);
    }

    @PostMapping("/verify/{imp_uid}")
    public IamportResponse<Payment> paymentByImpUid(@PathVariable String imp_uid) throws IamportResponseException, IOException, IamportResponseException, IOException {
        log.info("paymentByImpUid 진입");
        return iamportClient.paymentByImpUid(imp_uid);
    }
}
